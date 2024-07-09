import { useLogStore } from "../../stores/useLogStore";
import { useAdminStore } from "../../stores/useAdminStore";
import { deleteCookies } from "../../functions/cookieHandler";
import { Link } from "react-router-dom";
function Logout () {
const { toggleIsLoggedIn } = useLogStore();
const isAdminLogged = useAdminStore((state) => state.isAdminLogged);
const { setIsAdminLogged } = useAdminStore();

function onClickButton () {

    if(!isAdminLogged) {
        toggleIsLoggedIn();
    deleteCookies();
    } else {
        toggleIsLoggedIn()
        deleteCookies();
        setIsAdminLogged(false);
    }
    
    
    
}

    return (
        <Link
            className="header_links_link"
            to={"/"}
            onClick={() => onClickButton()
             }
          >
            Logout
          </Link>
    )
}

export default Logout