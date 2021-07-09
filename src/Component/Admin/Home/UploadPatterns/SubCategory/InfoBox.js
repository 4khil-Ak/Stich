import "./InfoBox.css";

const InfoBox = (props) => {
  return (
    <div className="info_box">
      <h1 className="heading">{props.subCategoryDetails.subcategoryName}</h1>
      <article className="content">
        <div className="wrap">
          <img
            className="img-fluid"
            src={props.subCategoryDetails.subcategoryImage}
            alt={props.subCategoryDetails.subcategoryName}
          />
          <div className="btn-set">
            <button
              type="button"
              className="change-name"
              onClick={props.changeName}
            >
              Change Name
            </button>
            <button
              type="button"
              className="change-btn"
              onClick={props.changeImage}
            >
              Change Image
            </button>
            <button type="button" className="delete-gender">
              New
            </button>
            <button
              type="button"
              className="delete-gender"
              onClick={props.deleteHandler}
            >
              Delete
            </button>
          </div>
        </div>
        <div className="count">
          <p>
            Gender
            <span className="category-count">
              {props.subCategoryDetails.genderName}
            </span>{" "}
          </p>
          <p>
            Category
            <span className="category-count">
              {props.subCategoryDetails.categoryName}
            </span>{" "}
          </p>
          <p>
            No of Styles<span className="category-count">12</span>{" "}
          </p>
        </div>
        <div class="view-all">
          <button
            className="category-link"
            onClick={() =>
              props.view(
                props.subCategoryDetails.genderName,
                props.subCategoryDetails.categoryName,
                props.subCategoryDetails.subcategoryName
              )
            }
          >
            View All Sub-Category
          </button>
          <button className="category-new" onClick={props.addNew}>
            Add New Sub-Category
          </button>
        </div>
      </article>
    </div>
  );
};

export default InfoBox;
