import React, { useEffect, useState } from "react";
import qs from "qs";
import firebase from "../../../../../Services/firebase/firebase";
import Spinner from "../../../../UI/Spinner/Spinner";
import Info from "./Info";
import InfoBox from "./InfoBox";
import ChangeModal from "../../../../UI/AddNewModal/ChangeModal.js";

let genderName = undefined;
const db = firebase.firestore();

const Category = (props) => {
  // if category is clicked directly show all categories from all genders
  // if category is clicked from gender, show only categories based on that gender
  const [categoryList, setCategoryList] = useState(null);
  const [isChange, setIsChange] = useState(null); // for modal
  const [newData, setNewData] = useState({
    name: "",
    img: null
  });
  // let list = [];
  const [category, setCategory] = useState({
    categoryId: 1,
    categoryName: "Casuals",
    categoryImage:
      "https://firebasestorage.googleapis.com/v0/b/istitch-admin.appspot.com/o/gender%2Fmen.png?alt=media&token=c9cfa4ab-6ca3-482c-8bb8-7bdb415a9417",
    hide: false,
    delete: false,
    genderName: "Boy"
  });

  let list = [
    {
      categoryId: 1,
      categoryName: "Casuals",
      categoryImage:
        "https://firebasestorage.googleapis.com/v0/b/istitch-admin.appspot.com/o/gender%2Fmen.png?alt=media&token=c9cfa4ab-6ca3-482c-8bb8-7bdb415a9417",
      hide: false,
      delete: false,
      genderName: "Boy"
    },
    {
      categoryId: 2,
      categoryName: "Tops",
      categoryImage:
        "https://firebasestorage.googleapis.com/v0/b/istitch-admin.appspot.com/o/1624093452349.jpg?alt=media&token=cb9a34e9-a82c-4311-9b38-0e150fdb5768",
      hide: false,
      delete: false,
      genderName: "Girl"
    },
    {
      categoryId: 3,
      categoryName: "Saree",
      categoryImage:
        "https://firebasestorage.googleapis.com/v0/b/istitch-admin.appspot.com/o/gender%2Fmen.png?alt=media&token=c9cfa4ab-6ca3-482c-8bb8-7bdb415a9417",
      hide: false,
      delete: false,
      genderName: "Women"
    },
    {
      categoryId: 4,
      categoryName: "Shirt",
      categoryImage:
        "https://firebasestorage.googleapis.com/v0/b/istitch-admin.appspot.com/o/1624544801719.jpg?alt=media&token=ffd6c624-2fb0-4514-a8e9-500a6c004e48",
      hide: false,
      delete: false,
      genderName: "Men"
    }
  ];

  // useEffect(() => {
  //   genderName = qs.parse(props.location.search, {
  //     ignoreQueryPrefix: true
  //   }).gender;
  //   if (genderName !== undefined) {
  //     // get only categories specific to gender
  //     db.collection("gender")
  //       .doc(genderName)
  //       .collection("category")
  //       .get()
  //       .then((sub) => {
  //         if (sub.docs.length > 0) {
  //           // subcollection exists
  //           sub.forEach((subDoc) => {
  //             list.push(subDoc.data());
  //           });
  //           setCategoryList(list);
  //         } else {
  //           // subcollection not exists
  //           setCategoryList("empty");
  //         }
  //       })
  //       .catch((e) => console.log(e));
  //   } else {
  //     console.log("cliked directly");
  //     // get gender from UI
  //     setCategoryList("empty");
  //   }
  // }, []);

  const viewHandler = (genderName, categoryName) => {
    console.log("viewing subcategory");
    props.history.push(
      `${props.match.url}/createNewPattern/subCategory?gender=${genderName}&category=${categoryName}`
    );
  };

  const addNewHandler = () => {
    props.addNewSubCategory();
  };

  // let categories = null;
  // if (categoryList === null) {
  //   categories = <Spinner />;
  // } else if (categoryList === "empty") {
  //   // no categor availble
  //   categories = <h1>No categories available</h1>;
  // } else {
  //   categories = (
  //     <>
  //       <Info categoryList={list} />
  //       <InfoBox
  //         title="Category"
  //         categoryList={list}
  //         view={viewHandler}
  //         addNew={addNewHandler}
  //       />
  //     </>
  //   );
  // }

  const selectedCategoryHandler = (category) => {
    setCategory(category);
  };

  // for newName updating, two-way binding
  const onChangeHandler = (event) => {
    // console.log(event.target.name);
    let value = null;
    if (event.target.name === "img") {
      value = event.target.files[0];
    } else {
      value = event.target.value;
    }
    setNewData((prevState) => {
      return {
        ...prevState,
        [event.target.name]: value
      };
    });
  };

  // updating image or name
  const changeSubmitHandler = () => {
    // console.log(newName, newImage);
    // update the changes in firebase
    // db.collection("gender").doc(category.genderName).collection("category");
    if (newData.img !== null && newData.name === "") {
      console.log(category.genderName, category.categoryName, newData.img);
    } else {
      console.log(category.genderName, category.categoryName, newData.name);
    }
    setNewData({
      name: "",
      img: null
    });
    setIsChange(false);
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
      {/* {categories} */}
      {isChange && (
        <ChangeModal
          title={isChange}
          submit={changeSubmitHandler}
          onChange={onChangeHandler}
          newName={newData.name}
          closeModal={() => {
            setIsChange(null);
            setNewData({
              name: "",
              img: null
            });
          }}
        />
      )}
      <Info categoryList={list} selectedCategory={selectedCategoryHandler} />
      <InfoBox
        title="Category"
        categoryDetails={category}
        view={viewHandler}
        addNew={addNewHandler}
        changeName={() => setIsChange("name")}
        changeImage={() => setIsChange("image")}
      />
    </div>
  );
};

export default Category;
