import { Helmet, HelmetProvider } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import menuImgg from '../../../assets/menu/menu-bg.png'
import dessertImg from '../../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../../assets/menu/pizza-bg.jpg'
import saladImg from '../../../assets/menu/salad-bg.jpg'
import soupImg from '../../../assets/menu/soup-bg.jpg'
import useMenu from '../../../hooks/useMenu';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';

const Menu = () => {
    const [menu] = useMenu();
    const dessert = menu.filter(item => item.category === 'dessert');
    const soup = menu.filter(item => item.category === 'soup');
    const salad = menu.filter(item => item.category === 'salad');
    const pizza = menu.filter(item => item.category === 'pizza');
    const offered = menu.filter(item => item.category === 'offered');
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | menu</title>
            </Helmet>
            <Cover
                img={menuImgg} title='our memnu'
            ></Cover>
            {/* main cover */}
            <SectionTitle
                subHeading='Dont miss '
                heading=" todays offer"
            ></SectionTitle>
            {/* offered  */}
            <MenuCategory
                items={offered}
            ></MenuCategory>
            {/* desert */}
            <MenuCategory
                items={dessert}
                title='dessert'
                img={dessertImg}
            ></MenuCategory>
            {/* pizza */}
            <MenuCategory
                items={pizza}
                title='pizza'
                img={pizzaImg}
            ></MenuCategory>
            {/* salad */}
            <MenuCategory
                items={salad}
                title='salad'
                img={saladImg}
            ></MenuCategory>
            {/* pizza */}
            <MenuCategory
                items={soup}
                title='soup'
                img={soupImg}
            ></MenuCategory>
        </div>
    );
};

export default Menu;