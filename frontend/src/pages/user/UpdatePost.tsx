import { Form, Button, Container } from "react-bootstrap";
import { PostInputDataType } from "../../types/types";
import { useState } from "react";
import { useUpdatePostMutation } from "../../api/postsApi";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useGetAllPostsQuery } from "../../api/postsApi";
import { Header } from "../../components/Header";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGetAllCategoriesQuery } from "../../api/categoriesApi";

export const UpdatePost = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const userInfo = useSelector((state: RootState) => state.userInfo);

  const { data: posts } = useGetAllPostsQuery();

  const postToUpdate = posts?.find((post) => post._id === id);

  const { data: categories } = useGetAllCategoriesQuery();

  if (!postToUpdate) {
    throw new Error("no posts");
  }

  const [updatePostInputData, setUpdatePostInputData] =
    useState<PostInputDataType>({
      userId: userInfo._id,
      name: postToUpdate.name,
      description: postToUpdate.description,
      price: postToUpdate.price,
      category: postToUpdate.category,
      imageUrl: postToUpdate.imageUrl,
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatePostInputData({
      ...updatePostInputData,
      [e.target.name]: e.target.value,
    });
  };

  const { refetch } = useGetAllPostsQuery();

  const [updatePost, { isLoading, isError, error }] = useUpdatePostMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await updatePost({
        id,
        updatedPost: updatePostInputData,
      }).unwrap();
      navigate("/myPosts");
      console.log(response);
      await refetch();
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  console.log(updatePostInputData);

  return (
    <div>
      <div>
        <Header />
      </div>
      <Container>
        <h2>Update post</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              placeholder="Enter product name"
              value={updatePostInputData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              name="category"
              as="select"
              value={updatePostInputData.category}
              onChange={handleChange}
            >
              {categories?.map((category) => (
                <option value={category.name} key={category._id}>
                  {category.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              as="textarea"
              rows={3}
              placeholder="Enter product description"
              value={updatePostInputData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter product price"
              value={updatePostInputData.price}
              onChange={handleChange}
              required
              name="price"
            />
          </Form.Group>

          <Form.Group controlId="formImageUrl">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="url"
              placeholder="Enter image URL (HTTPS)"
              value={updatePostInputData.imageUrl}
              onChange={handleChange}
              required
              name="imageUrl"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
          {isError && (
            <p className="text-danger mt-2">
              {(error as any).data.message || "Creating a post failed"}
            </p>
          )}
        </Form>
      </Container>
    </div>
  );
};
