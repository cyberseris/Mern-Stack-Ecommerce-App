import { useState, useContext, createContext } from 'react'

//SearchContext 是一個特殊的筆記本，其中包含了使用者的搜尋資訊。
const SearchContext = createContext();

//SearchProvider 是一個魔法頁面，它負責搜尋資訊。當使用者搜尋時，它會在筆記本中記錄或清除相關資訊。
const SearchProvider = ({ children }) => {
    const [auth, setAuth] = useState(
        {
            keyword: "",
            results: [],
        }
    );

    return (
        <SearchContext.Provider value={[auth, setAuth]}>
            {children}
        </SearchContext.Provider>
    )
}

//魔法地圖，其他頁面可以使用這張地圖來找到 SearchContext 中的搜尋資訊。
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider }