import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";


const PopularMenu = () => {
    const [menu]=useMenu();
    const popular =menu.filter(item=>item.category === "popular")
//     const [menu,setMenu]=useState([]);
//  useEffect(()=>{
//     fetch('menu.json')
//     .then(res=>res.json())
//     .then(data=>{
//         const popularItems =data.filter(item=> item.category === 'popular');
//         setMenu(popularItems)
//     })
//  },[])
    return (
        <div>
            <section>
                <SectionTitle
                heading="From opur menu"
                subHeading="Popular Items"
                ></SectionTitle>
            </section>
            <div className="grid md:grid-cols-2 gap-4">
                {
                    popular.map(item=><MenuItem
                    key={item._id}
                    item={item}
                    ></MenuItem>)
                }
            </div>
        </div>
    );
};

export default PopularMenu;