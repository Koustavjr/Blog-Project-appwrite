import React, { useCallback } from "react";
import service from "../../appwrite/config";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Select, Input, RTE } from "../index";

export default function PostForm({ post }) {
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const {register, handleSubmit, watch, setValue, control, getValues} = useForm(
    {
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    }
  );

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await service.uploadFile(data.image[0])
        : null;

      if (file) {
        await service.deleteFile(post.featuredImage);
      }

      const dbPost = await service.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) navigate(`/post/${dbPost.$id}`);
    } else {
      const file = await service.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage=fileId;
        const DbPost = await service.createPost({
          ...data,
          //featuredImage: fileId,
          userId: userData.$id,
        });

        if (DbPost) navigate(`/post/${dbPost.$id}`);
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  React.useEffect(() => {
    const subscribe = watch((value, { name }) => {
      if (name === "title") setValue("slug", slugTransform(value.title),{shouldValidate:true});
    });

    return () => subscribe.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title"
          type="text"
          className="mb-4"
          {...register("title", {
            required: true,
          })}
        />
        <Input
          label="Slug"
          type="text"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", {
            required: true,
          })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.target.value));
          }}
        />
        <RTE
          name="content"
          label="Content :"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      <div className="1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
            {post && <div className="w-full mb-4">
                <img 
                src={service.getFilePreview(post.featuredImage)} 
                alt={post.title}
                className="rounded-lg"
                />
            </div> 
            }

            <Select 
            options={["active","inactive"]}
            label="Status"
            classname="mb-4"
            {...register("status",{required:true})}

            />

            <Button type="submit" bg-color={post?"bg-green-300":undefined} classname="w-full">
                {post?"Update":"Submit"}

            </Button>
      </div>
    </form>
  );
}
