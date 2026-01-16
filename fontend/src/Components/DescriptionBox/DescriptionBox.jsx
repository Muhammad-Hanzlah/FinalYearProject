import { memo } from "react";
import "./DescriptionBox.css";

const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (222)</div>
      </div>
      <div className="descriptionbox-description">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut, ea
          quidem. Illo nemo impedit sint, laboriosam repudiandae sequi aliquam
          suscipit delectuipsum dolor sit amet, consectetur adipisicing elit.
          Cumque beatae id earum soluta unde vero, autem provident accusantium
          nihil, corporis alias, porro voluptates quam tempora doloribus ipsa
          eligendi hic voluptatibus.
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo,
          inventore! nesciunt optio obcaecati dolorem ipsum amet aperiam eius
          laboriosam enim impedit.
        </p>
      </div>
    </div>
  );
};

export default memo(DescriptionBox);
