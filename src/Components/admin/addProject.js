import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Admin_Add_project = () => {
  const router = useRouter();

  useEffect(() => {
    // Check if user exists in localStorage
    const user = localStorage.getItem("user");
    if (!user) {
      // Redirect to /admin/adminLogin page if user doesn't exist
      router.push("/admin/adminLogin");
    }
  }, []);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [creator, setCreator] = useState("");
  const [creatorProfile, setCreatorProfile] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [status, setStatus] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "slug":
        setSlug(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "creator":
        setCreator(value);
        break;
      case "creatorProfile":
        setCreatorProfile(value);
        break;
      case "category":
        setCategory(value);
        break;
      case "subCategory":
        setSubCategory(value);
        break;
      case "status":
        setStatus(value);
        break;
      case "deadline":
        setDeadline(value);
        break;
      default:
        break;
    }
  };

  const handleImageUrlChange = (e, index) => {
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = e.target.value;
    setImageUrls(newImageUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title,
      slug,
      description,
      images: imageUrls.map((url) => ({ url })),
      creator,
      creatorProfile,
      category,
      subCategory,
      status,
      deadline,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/addProjects`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        // Reset the form
        setTitle("");
        setSlug("");
        setDescription("");
        setImageUrls([]);
        setCreator("");
        setCreatorProfile("");
        setCategory("");
        setSubCategory("");
        setStatus("");
        setDeadline("");
        toast.success("Project added successfully", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("Something went wrong", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="a_container">
        <ToastContainer
          position="top-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <form className="a_form" onSubmit={handleSubmit}>
          <div className="a_form_content">
            <h1 className="contact_heading admin_contact_heading">Add Project</h1>
            <div className="form admin_form">
              <div className="group">
                <input
                  value={title}
                  onChange={handleChange}
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Title"
                  required
                />
                <span className="highlight"></span>
                <label className="label" htmlFor="title">
                  Title
                </label>
                <label className="label" htmlFor="title">
                  Title
                </label>
              </div>
              <div className="group">
                <input
                  value={slug}
                  onChange={handleChange}
                  type="text"
                  name="slug"
                  id="slug"
                  placeholder="Slug"
                  required
                />
                <span className="highlight"></span>
                <label className="label" htmlFor="slug">
                  Slug
                </label>
              </div>
              <div className="group desc_group">
                <textarea
                  value={description}
                  onChange={handleChange}
                  name="description"
                  id="description"
                  rows={5}
                  placeholder="Description"
                  required
                  autoComplete="off"
                />
                <span className="highlight"></span>
              </div>
              <div className="group">
                <input
                  value={creator}
                  onChange={handleChange}
                  type="text"
                  name="creator"
                  id="creator"
                  placeholder="Creator"
                  required
                />
                <span className="highlight"></span>
                <label className="label" htmlFor="creator">
                  Creator
                </label>
              </div>
              <div className="group">
                <input
                  value={creatorProfile}
                  onChange={handleChange}
                  type="text"
                  name="creatorProfile"
                  id="creatorProfile"
                  placeholder="Creator Profile"
                  required
                />
                <span className="highlight"></span>
                <label className="label" htmlFor="creatorProfile">
                  Creator Profile
                </label>
              </div>
              <div className="group">
                <input
                  value={imageUrls[0] || ""}
                  onChange={(e) => handleImageUrlChange(e, 0)}
                  type="text"
                  name="imageUrl1"
                  id="imageUrl1"
                  placeholder="Image URL (Required)"
                  required
                />
                <span className="highlight"></span>
                <label className="label" htmlFor="imageUrl1">
                  Image URL (Required)
                </label>
              </div>
              {[1, 2, 3, 4, 5].map((index) => (
                <div className="group" key={index}>
                  <input
                    value={imageUrls[index] || ""}
                    onChange={(e) => handleImageUrlChange(e, index)}
                    type="text"
                    name={`imageUrl${index + 1}`}
                    id={`imageUrl${index + 1}`}
                    placeholder={`Image URL ${index + 1} (Optional)`}
                  />
                  <span className="highlight"></span>
                </div>
              ))}
              <div className="group">
                <input
                  value={deadline}
                  onChange={handleChange}
                  type="date"
                  name="deadline"
                  id="deadline"
                  placeholder="Deadline"
                  required
                />
                <span className="highlight"></span>
              </div>
              <div className="group_dropdowns">
              <div className="group admin_group">
                <select
                  value={status}
                  onChange={handleChange}
                  name="status"
                  id="status"
                  required
                >
                  <option className="selction_option" value="">Status</option>
                  <option value="in progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="on hold">On Hold</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <span className="highlight"></span>
              </div>
              <div className="group admin_group">
                <select
                  value={category}
                  onChange={handleChange}
                  name="category"
                  id="category"
                  required
                >
                  <option className="selction_option" value="">Category</option>
                  <option value="gfx">GFX</option>
                  <option value="programming">Programming</option>
                </select>
                <span className="highlight"></span>
              </div>
              <div className="group admin_group">
                <select
                  value={subCategory}
                  onChange={handleChange}
                  name="subCategory"
                  id="subCategory"
                  required
                >
                  <option className="selction_option" value="">Sub Category</option>
                  <option value="illustration">Illustration</option>
                  <option value="gfx">GFX</option>
                  <option value="3d">3D</option>
                  <option value="eshop">Eshop</option>
                  <option value="bzness">Bzness</option>
                  <option value="portfolio">Portfolio</option>
                </select>
                <span className="highlight"></span>
              </div>
              </div>
              <div className="admin_form_submit_button">
                <button type="submit" className="form_submit admin_form_submit">
                  Add Project
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Admin_Add_project;
