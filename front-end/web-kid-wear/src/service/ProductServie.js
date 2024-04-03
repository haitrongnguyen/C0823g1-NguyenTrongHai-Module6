import axios from "axios";
export const getAllProduct = async (page, searchName, categoryId) => {
    try {
        let rs = await axios.get(`http://localhost:8080/home?page=${page}&searchName=${searchName}&categoryId=${categoryId}`);
        return rs.data
    } catch (e) {
        return undefined
    }
}
export const getAllProductPro = async (page, searchName, categoryId) => {
    try {
        let rs = await axios.get(`http://localhost:8080/home/search?page=${page}&searchName=${searchName}&categoryId=${categoryId}`);
        return rs.data
    } catch (e) {
        return undefined
    }
}
export const addToCart = async (product, id, quantity) => {
    if (quantity === undefined) {
        quantity = 1
    }
    try {
        let rs = await axios.post(`http://localhost:8080/home?accountId=${id}&productId=${product}&quantity=${quantity}`);
        return rs.data
    } catch (e) {
        return undefined
    }
}

export const getCart = async (accountId) => {
    try {
        let rs = await axios.get(`http://localhost:8080/home/cart/${accountId}`);
        return rs.data
    } catch (e) {
        return undefined
    }
}

export const getSum = async (accountId) => {
    try {
        let rs = await axios.get(`http://localhost:8080/home/cart/sum/${accountId}`);
        return rs.data
    } catch (e) {
        return undefined
    }
}
export const getSumCart = async (accountId) => {
    try {
        let rs = await axios.get(`http://localhost:8080/home/cart/cart/${accountId}`);
        return rs.data
    } catch (e) {
        return undefined
    }
}

export const getProduct = async (id) => {
    try {
        let rs = await axios.get(`http://localhost:8080/home/product/${id}`);
        return rs.data
    } catch (e) {
        return undefined
    }
}
export const plusQuantity = async (id) => {
    try {
        let rs = await axios.get(`http://localhost:8080/home/cart/plus/${id}`);
        return rs.data
    } catch (e) {
        return undefined
    }
}

export const divQuantity = async (id) => {
    try {
        let rs = await axios.get(`http://localhost:8080/home/cart/div/${id}`);
        return rs.data
    } catch (e) {
        return undefined
    }
}

export const deleteCartItem = async (id) => {
    try {
        let rs = await axios.get(`http://localhost:8080/home/cart/delete/${id}`);
        return rs.data
    } catch (e) {
        return undefined
    }
}

export const getAllCate = async () => {
    try {
        let rs = await axios.get(`http://localhost:8080/home/cate`);
        return rs.data
    } catch (e) {
        return undefined
    }
}

export const checkLike = async (accountId) => {
    try {
        let rs = await axios.get(`http://localhost:8080/home/check?accountId=${accountId}`);
        return rs.data
    } catch (e) {
        return undefined
    }
}

export const like = async (accountId, productId) => {
    try {
        let rs = await axios.post(`http://localhost:8080/home/like/${productId}/${accountId}`);
        return rs.data
    } catch (e) {
        return undefined
    }
}

export const getProductLikedByManyPeople = async () => {
    try {
        let rs = await axios.get(`http://localhost:8080/home/product/like`);
        return rs.data
    } catch (e) {
        return undefined
    }
}

