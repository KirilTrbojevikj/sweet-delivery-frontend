import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useTokenData } from "../../hooks/useTokenData";
import { ItemService } from "../../service/ItemService";
import { PostService } from "../../service/PostService";
import { RecipeService } from "../../service/RecipeService";
import { CreateRecipe, Item, Status } from "../../types";
import { SelectInput } from "../Inputs/SelectInput";
import { TextInput } from "../Inputs/TextInput";

const RecipeForm = Yup.object().shape({
  name: Yup.string().required("Required"),
  price: Yup.number().required("Required"),
  description: Yup.string(),
  img_url: Yup.string(),
  itemList: Yup.array(),
});

type Props = {
  onClose: (input: boolean) => any;
};

export const AddNewRecipeForm: React.FC<Props> = ({ onClose }) => {
  const [items, setItems] = useState<Array<Item>>([]);
  const tokenData = useTokenData();

  useEffect(() => {
    ItemService.fetchAll().then((resp) => {
      if (resp.status === Status.SUCCESS) {
        setItems(resp.value);
      }
    });
  }, []);

  return (
    <Formik
      onSubmit={(values, actions) => {
        const newRecipe: CreateRecipe = { ...values };
        RecipeService.createRecipe(newRecipe).then((resp) => {
          console.log(resp);
          if (resp.status === Status.SUCCESS) {
            PostService.createPost({
              recipeId: resp.value.id,
              userName: tokenData?.sub!,
            }).then((resp) => {
              console.log(resp);
              if (resp.status === Status.SUCCESS) {
                onClose(false);
              }
            });
          }
        });
      }}
      initialValues={{
        name: "",
        price: 0,
        description: "",
        img_url: "",
        itemList: [],
      }}
      validationSchema={RecipeForm}
    >
      <Form>
        <TextInput
          type="text"
          name="name"
          id="name"
          placeholder="Enter recipe name"
          label="Recipe name"
        ></TextInput>
        <TextInput
          type="text"
          name="price"
          id="price"
          placeholder="Enter recipe price"
          label="Price"
        ></TextInput>
        <TextInput
          type="text"
          name="description"
          id="description"
          placeholder="Enter recipe description"
          label="Description"
        ></TextInput>
        <TextInput
          type="text"
          name="img_url"
          id="img_url"
          placeholder="Enter recipe image"
          label="Image URL"
        ></TextInput>
        <div>
          <label
            htmlFor={"itemList"}
            className="text-gray-800 sm:mt-px sm:pb-2"
          >
            Recipe Products
          </label>
          <div className="mt-1 sm:col-span-2 sm:mt-0">
            <Field
              name="itemList"
              component={SelectInput}
              isMulti={true}
              options={items.map((item) => {
                return {
                  label: item.name,
                  value: item.id,
                };
              })}
              placeholder={"Select ..."}
              className="min-h-fit"
            />
            <div className="mt-2 mb-4 h-2 text-center">
              <ErrorMessage name={"itemList"}>
                {(errorMessage) => (
                  <div className="text-xs font-light text-red-600">
                    {errorMessage}
                  </div>
                )}
              </ErrorMessage>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-emerald-500 rounded-md p-3 text-white font-bold"
        >
          Add your recipe
        </button>
      </Form>
    </Formik>
  );
};
