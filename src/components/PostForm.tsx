import { actions } from "astro:actions";
import { useForm } from "react-hook-form";
import type { FormType } from "../types/post";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useEffect } from "react";
interface PostFormProps {
  id?: string;
  initialData?: FormType;
}

export const PostForm = ({ id, initialData }: PostFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormType>();

  console.log(initialData);

  useEffect(() => {
    if (initialData) {
      setValue("title", initialData.title);
      setValue("content", initialData.content);
      setValue("slug", initialData.slug || "");
      setValue("isPublished", initialData.isPublished);
    }
  }, [initialData, setValue]);

  const handleFormSubmit = async (data: FormType) => {
    try {
      let response;
      if (id) {
        //console.log("UPDATEEEE");
        response = await actions.updatePost.safe({ id, ...data });
      } else {
        //console.log("CREATEEEE");
        response = await actions.createPost.safe(data);
      }
      const { data: responseData, error } = response;
      if (responseData) {
        alert(responseData);
        // console.log(responseData);
      }
      if (error) {
        console.log(error.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Update Post" : "Create Post"}
      </h1>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="w-2/3 space-y-6"
      >
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium">
            Title:
          </label>
          <Input
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded mt-1"
            {...register("title")}
          />
          {errors.title && <div>{errors.title.message}</div>}
        </div>
        <div className="mb-4">
          <label htmlFor="content">Content:</label>
          <Textarea
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded mt-1"
            {...register("content")}
          />
          {errors.content && <div>{errors.content.message}</div>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium" htmlFor="slug">
            Slug:
          </label>
          <Input
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded mt-1"
            {...register("slug")}
          />
          {errors.slug && <div>{errors.slug.message}</div>}
        </div>
        <div className="mb-4 flex items-center">
          <Input
            className="form-checkbox w-4 h-4 text-purple-600 bg-gray-800 border-gray-700 rounded focus:ring-purple-500 mr-2"
            type="checkbox"
            {...register("isPublished")}
            defaultChecked={initialData?.isPublished}
          />

          <label className="block text-sm font-medium" htmlFor="isPublished">
            is Published: {initialData?.isPublished}
          </label>
        </div>
        <Input
          className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
          type="submit"
          disabled={isSubmitting}
          value={isSubmitting ? "Submitting..." : "Submit"}
        />
      </form>
    </>
  );
};
