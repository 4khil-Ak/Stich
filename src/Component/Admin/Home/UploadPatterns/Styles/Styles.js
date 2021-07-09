import React, { useState, useEffect } from "react";
import Info from "./Info";
import InfoBox from "./InfoBox";
import firebase from "../../../../../Services/firebase/firebase";
import Spinner from "../../../../UI/Spinner/Spinner";
import qs from "qs";
import ChangeModal from "../../../../UI/AddNewModal/ChangeModal.js";

// let genderName = undefined;
// let categoryName = undefined;
// let subCategoryName = undefined;
const db = firebase.firestore();

const Styles = (props) => {
  const [stylesList, setStylesList] = useState(null);
  const [isChange, setIsChange] = useState(null); // for modal
  const [newData, setNewData] = useState({
    name: "",
    img: null
  });
  const [styles, setStyles] = useState({
    stylesId: 1,
    stylesName: "Collar style",
    stylesImage:
      "https://firebasestorage.googleapis.com/v0/b/istitch-admin.appspot.com/o/1624125218423.jpg?alt=media&token=a32bb233-9659-4e63-b652-d7ef87bc6702",
    hide: false,
    delete: false,
    genderName: "Boy",
    categoryName: "Casuals",
    subCategoryName: "Collar"
  });
  // let list = [];

  let list = [
    {
      stylesId: 1,
      stylesName: "Collar style",
      stylesImage:
        "https://firebasestorage.googleapis.com/v0/b/istitch-admin.appspot.com/o/1624125218423.jpg?alt=media&token=a32bb233-9659-4e63-b652-d7ef87bc6702",
      hide: false,
      delete: false,
      genderName: "Boy",
      categoryName: "Casuals",
      subCategoryName: "Collar"
    },
    {
      stylesId: 2,
      stylesName: "apple cut",
      stylesImage:
        "https://firebasestorage.googleapis.com/v0/b/istitch-admin.appspot.com/o/1624125218423.jpg?alt=media&token=a32bb233-9659-4e63-b652-d7ef87bc6702",
      hide: false,
      delete: false,
      genderName: "Boy",
      categoryName: "Casuals",
      subCategoryName: "bottom tshirt"
    },
    {
      stylesId: 3,
      stylesName: "no collor style",
      stylesImage:
        "https://firebasestorage.googleapis.com/v0/b/istitch-admin.appspot.com/o/1624176232536.jpg?alt=media&token=edcbbdf5-980a-4683-831f-e6172319f8c7",
      hide: false,
      delete: false,
      genderName: "Girls",
      categoryName: "Tops",
      subCategoryName: "neck"
    },
    {
      stylesId: 4,
      stylesName: "bottom style",
      stylesImage:
        "https://firebasestorage.googleapis.com/v0/b/istitch-admin.appspot.com/o/1624093452349.jpg?alt=media&token=cb9a34e9-a82c-4311-9b38-0e150fdb5768",
      hide: false,
      delete: false,
      genderName: "Girls",
      categoryName: "Tops",
      subCategoryName: "bottom top"
    }
  ];

  // useEffect(() => {
  //   genderName = qs.parse(props.location.search, {
  //     ignoreQueryPrefix: true
  //   }).gender;
  //   // get category & subcateogry from query param
  //   if (genderName !== undefined) {
  //     // get only categories specific to gender
  //     db.collection("gender")
  //       .doc(genderName)
  //       .collection("category")
  //       .doc(categoryName)
  //       .collection("subcategory")
  //       .doc(subCategoryName)
  //       .collection("styles")
  //       .get()
  //       .then((sub) => {
  //         if (sub.docs.length > 0) {
  //           // subcollection exists
  //           sub.forEach((subDoc) => {
  //             list.push(subDoc.data());
  //           });
  //           setStylesList(list);
  //         } else {
  //           // subcollection not exists
  //           setStylesList("empty");
  //         }
  //       })
  //       .catch((e) => console.log(e));
  //   } else {
  //     console.log("cliked directly");
  //     // get gender, category from UI
  //     setStylesList("empty");
  //   }
  // }, []);

  const viewHandler = () => {
    console.log("viewing style");
  };

  const addNewHandler = () => {
    console.log("adding new style");
  };

  // let styles = null;

  // if (stylesList === null) {
  //   styles = <Spinner />;
  // } else if (stylesList === "empty") {
  //   styles = <h1>No categories available</h1>;
  // } else {
  //   styles = (
  //     <>
  // <Info stylesList />
  // <InfoBox
  //   title="Styles"
  //   stylesList
  //   view={viewHandler}
  //   addNew={addNewHandler}
  // />
  //     </>
  //   );
  // }

  const selectedStylesHandler = (style) => {
    setStyles(style);
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
      console.log(styles.genderName, styles.subcategoryName, newData.img);
    } else {
      console.log(styles.genderName, styles.categoryName, newData.name);
    }
    setNewData({
      name: "",
      img: null
    });
    setIsChange(false);
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
      {/* {styles} */}
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
      <Info stylesList={list} selectedStyles={selectedStylesHandler} />
      <InfoBox
        title="Styles"
        stylesDetails={styles}
        view={viewHandler}
        addNew={addNewHandler}
        changeName={() => setIsChange("name")}
        changeImage={() => setIsChange("image")}
      />
    </div>
  );
};

export default Styles;
