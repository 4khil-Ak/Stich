import React, { useState, useEffect } from "react";
import Info from "./Info";
import InfoBox from "./InfoBox";
import firebase from "../../../../../Services/firebase/firebase";
import Spinner from "../../../../UI/Spinner/Spinner";
import qs from "qs";

import ChangeModal from "../../../../UI/AddNewModal/ChangeModal.js";

let genderName = undefined;
let categoryName = undefined;
const db = firebase.firestore();

const SubCategory = (props) => {
  const [subCategoryList, setSubCategoryList] = useState(null);
  const [isChange, setIsChange] = useState(null); // for modal
  const [newData, setNewData] = useState({
    name: "",
    img: null
  });
  const [subcategory, setSubcategory] = useState({
    subcategoryId: 1,
    subcategoryName: "Coler neck",
    subcategoryImage:
      "https://firebasestorage.googleapis.com/v0/b/istitch-admin.appspot.com/o/1624125218423.jpg?alt=media&token=a32bb233-9659-4e63-b652-d7ef87bc6702",
    hide: false,
    delete: false,
    genderName: "Boy",
    categoryName: "Casuals"
  });
  // let list = [];
  let list = [
    {
      subcategoryId: 1,
      subcategoryName: "Coler neck",
      subcategoryImage:
        "https://firebasestorage.googleapis.com/v0/b/istitch-admin.appspot.com/o/1624125218423.jpg?alt=media&token=a32bb233-9659-4e63-b652-d7ef87bc6702",
      hide: false,
      delete: false,
      genderName: "Boy",
      categoryName: "Casuals"
    },
    {
      subcategoryId: 2,
      subcategoryName: "Front neck",
      subcategoryImage:
        "https://firebasestorage.googleapis.com/v0/b/istitch-admin.appspot.com/o/1624125218423.jpg?alt=media&token=a32bb233-9659-4e63-b652-d7ef87bc6702",
      hide: false,
      delete: false,
      genderName: "Boy",
      categoryName: "Casuals"
    },
    {
      subcategoryId: 3,
      subcategoryName: "Front neck",
      subcategoryImage:
        "https://firebasestorage.googleapis.com/v0/b/istitch-admin.appspot.com/o/1624176232536.jpg?alt=media&token=edcbbdf5-980a-4683-831f-e6172319f8c7",
      hide: false,
      delete: false,
      genderName: "Girls",
      categoryName: "Tops"
    },
    {
      subcategoryId: 1,
      subcategoryName: "bottom",
      subcategoryImage:
        "https://firebasestorage.googleapis.com/v0/b/istitch-admin.appspot.com/o/1624093452349.jpg?alt=media&token=cb9a34e9-a82c-4311-9b38-0e150fdb5768",
      hide: false,
      delete: false,
      genderName: "Girls",
      categoryName: "Tops"
    }
  ];

  // useEffect(() => {
  //   genderName = qs.parse(props.location.search, {
  //     ignoreQueryPrefix: true
  //   }).gender;
  //   // category from query param

  //   if (genderName !== undefined) {
  //     // get only categories specific to gender
  //     db.collection("gender")
  //       .doc(genderName)
  //       .collection("category")
  //       .doc(categoryName)
  //       .collection("subcategory")
  //       .get()
  //       .then((sub) => {
  //         if (sub.docs.length > 0) {
  //           // subcollection exists
  //           sub.forEach((subDoc) => {
  //             list.push(subDoc.data());
  //           });
  //           setSubCategoryList(list);
  //         } else {
  //           // subcollection not exists
  //           setSubCategoryList("empty");
  //         }
  //       })
  //       .catch((e) => console.log(e));
  //   } else {
  //     console.log("cliked directly");
  //     // get gender, category from UI
  //     setSubCategoryList("empty");
  //   }
  // }, []);

  const viewHandler = (genderName, categoryName, subCategoryName) => {
    console.log("viewing subcategory");
    props.history.push(
      `${props.match.url}/createNewPattern/styles?gender=${genderName}&category=${categoryName}&subCategory=${subCategoryName}`
    );
  };

  const addNewHandler = () => {
    props.addNewStyles();
  };

  // let subCategories = null;

  // if (subCategoryList === null) {
  //   subCategories = <Spinner />;
  // } else if (subCategoryList === "empty") {
  //   subCategories = <h1>No categories available</h1>;
  // } else {
  //   subCategories = (
  //     <>
  // <Info subCategoryList ={list} selectedSubCategory={selectedSubCategory} />
  // <InfoBox
  //   title="SubCategory"
  //   subCategoryList={subcategory}
  //   view={viewHandler}
  //   addNew={addNewHandler}
  // />
  //     </>
  //   );
  // }

  const selectedSubCategory = (subcategory) => {
    setSubcategory(subcategory);
  };
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
      console.log(
        subcategory.genderName,
        subcategory.subcategoryName,
        newData.img
      );
    } else {
      console.log(
        subcategory.genderName,
        subcategory.categoryName,
        newData.name
      );
    }
    setNewData({
      name: "",
      img: null
    });
    setIsChange(false);
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
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
      <Info subCategoryList={list} selectedSubCategory={selectedSubCategory} />
      <InfoBox
        title="SubCategory"
        subCategoryDetails={subcategory}
        view={viewHandler}
        addNew={addNewHandler}
        changeName={() => setIsChange("name")}
        changeImage={() => setIsChange("image")}
      />
    </div>
  );
};

export default SubCategory;
