import React from "react";
import classes from "./Users.module.css"
import * as axios from "axios";
import fotoDefault from '../../drawable/avatarDefault.png'

class Users extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    componentDidMount() {
        //page - текущая страница, count - число пользователей на страницу
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.countUsersPage}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.setTotalCountUsers(response.data.totalCount);
                console.log(response);
            })
    }

    //отправка get запроса при нажатии на цифры в span
    onPageChange = (page) => {
        this.props.setCurrentPage(page)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.countUsersPage}`)
            .then(response => {
                this.props.setUsers(response.data.items);
            })
    }

    render() {
        //pagination
        let countPage = Math.ceil(this.props.totalCountUsers / this.props.countUsersPage);
        let pages = [];
        for (let i = 1; i <= countPage; i++) {
            pages.push(i);
        }
        ;
        return (
            <div className={classes.users}>
                <div> {pages.map(p => {
                    return <span onClick={(e) => {
                        this.onPageChange(p)
                    }}
                                 className={this.props.currentPage === p && classes.current}
                                 key={p.id}>{p}</span>
                })}
                </div>
                {this.props.users.map(u => <div key={u.id}>
                        <img src={u.photos.small
                        != null ? u.photos.small : fotoDefault}
                             alt={'photo'} />
                        <div>
                            {u.followed
                                ? <button onClick={() => {
                                    this.props.unfollow(u.id)
                                }}>Unfollow</button>
                                : <button onClick={() => {
                                    this.props.follow(u.id)
                                }}>Follow</button>

                            }
                        </div>
                        <div>{u.name}</div>
                        <div>{'u.location.country'}</div>
                        <div>{'u.location.city'}</div>
                    </div>
                )}
            </div>
        );
    }
}

export default Users;


//Заюзаем этот метод в конструкторе и сделаем get API запрос при создании нового объекта (компоненты) без кнопки
// getUsers = () => {
//     if (this.props.users.length === 0) {
//         axios.get('https://social-network.samuraijs.com/api/1.0/users')
//             .then(response => {
//                 console.log(response);
//                 this.props.setUsers(response.data.items)
//             })
//     }
// }

//Через dispatch мы получили с сервера такой массив с данными:
//  data:
//         error: null
//   items: Array(10)
//              0:
//              followed: false
//              id: 9475
//              name: "esenoukg"
//              photos: {small: null, large: null}
//              status: null
//              uniqueUrlName: null
//              __proto__: Object
//     1: {name: "esenou", id: 9474, uniqueUrlName: null, photos: {…}, status: null, …}
//     2: {name: "Ben", id: 9473, uniqueUrlName: null, photos: {…}, status: null, …}
//     3: {name: "LSD", id: 9472, uniqueUrlName: null, photos: {…}, status: null, …}
//     4: {name: "fromery", id: 9471, uniqueUrlName: null, photos: {…}, status: null, …}
//     5: {name: "VenchasS", id: 9470, uniqueUrlName: null, photos: {…}, status: null, …}
//     6: {name: "VTreactJS", id: 9469, uniqueUrlName: null, photos: {…}, status: null, …}
//     7: {name: "ArtyWallace", id: 9468, uniqueUrlName: null, photos: {…}, status: null, …}
//     8: {name: "Wallace", id: 9467, uniqueUrlName: null, photos: {…}, status: null, …}
//     9: {name: "siegheart", id: 9466, uniqueUrlName: null, photos: {…}, status: null, …}