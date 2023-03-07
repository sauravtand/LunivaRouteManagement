import useToken from "../CustomHooks/useToken";

function useAuth() {
    const { token } = useToken()
    return typeof token === 'object' && token.Um > 0 ? true : false;
}

export default useAuth