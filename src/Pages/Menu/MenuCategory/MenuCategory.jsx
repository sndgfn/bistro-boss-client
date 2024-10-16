import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const MenuCategory = ({ items,title,img }) => {

    return (
        <div className="pt-8">
            {  title && <Cover
                    img={img} title={title}
                ></Cover>
            }
            <div className="grid md:grid-cols-2 mt-16 gap-4">
                {
                    items.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    ></MenuItem>)
                }
            </div>
            <Link to={`/order/${title}`}>
            <button className="btn btn-outline border-b-4 mt-4 border-0 ">Order Now </button>
            </Link>
        </div>
    );
};

export default MenuCategory;