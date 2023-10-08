import { useState, useEffect, useContext, createContext } from 'react'


//AuthContext 是一個特殊的筆記本，其中包含了使用者的身分和令牌等身分驗證資訊。
const AuthContext = createContext()

//AuthProvider 是一個魔法頁面，它負責管理和提供身分驗證資訊。當使用者登入或登出時，它會在筆記本中記錄或清除相關資訊。
const AuthProvider = ({ children }) => {
    /* const [auth, setAuth] = useState() */

    const [auth, setAuth] = useState(
        {
            user: null,
            toekn: ''
        }
    )

    /* [auth] 可能會無限循環，因為每次 useEffect 更新 auth 時都會再次觸發它，設置為 []，它只會在組件渲染後執行一次。
    useEffect(() => {
        XXX
    }, [auth]) */


    useEffect(() => {
        const data = localStorage.getItem('auth')

        if (data) {
            const parseData = JSON.parse(data);
            setAuth({
                ...auth,
                user: parseData.user,
                token: parseData.token
            })
        }

    }, [])

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

//useAuth 是一張地圖，其他頁面可以使用這張地圖來找到 AuthContext 中的身分驗證資訊。這張地圖使其他頁面能夠輕鬆地查詢或修改身分驗證資訊，就像使用導航一樣。
//custom hook
const useAuth = () => useContext(AuthContext)

export { useAuth, AuthProvider }