import { userService } from 'services';
import { Link } from 'components';

export default Home;

function Home() {
    return (
        <div className="p-4">
            <div className="container">
                <h1>Hi {userService.userValue?.firstName}!</h1>
                <p>Are you ready to learn some SQL!!</p>
                {/* <p><Link href="/users">Manage Users</Link></p> */}
            </div>
        </div>
    );
}
