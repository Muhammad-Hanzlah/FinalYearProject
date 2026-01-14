// import { memo } from 'react';
// import './Breadcrum.css';
// import arrow_icon from '../Assets/breadcrum_arrow.png';

// const Breadcrum = (props) => {
//     const {product} = props;
//   return (
//     <div className='breadcrum'>
//         HOME <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt="" /> {product.category} <img src={arrow_icon} alt="" /> {product.name}
//     </div>
//   );
// };

// export default memo(Breadcrum);




















import { memo } from 'react';
import './Breadcrum.css';
import arrow_icon from '../Assets/breadcrum_arrow.png';

const Breadcrum = (props) => {
    const {product} = props;

    // Safety: If product is undefined, show default path
    if (!product) {
        return <div className='breadcrum'>HOME <img src={arrow_icon} alt="" /> SHOP</div>;
    }

    return (
        <div className='breadcrum'>
            HOME <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt="" /> {product.category} <img src={arrow_icon} alt="" /> {product.name}
        </div>
    );
};

export default memo(Breadcrum);