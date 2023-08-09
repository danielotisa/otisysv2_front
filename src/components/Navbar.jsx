import { menuItems } from "../menuItems";
import MenuItems from './MenuItems';

const Navbar = () => {
    return (
      <nav>
        <ul className="menus">
            {menuItems.map((menu, i) => {
                return <MenuItems items={menu} key={i} />;
            })}
        </ul>
      </nav>
    );
  };
  
  export default Navbar;