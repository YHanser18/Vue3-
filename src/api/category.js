import request from "@/utils/request"

// 获取所有商品分类列表
export const getCateList = () => request.get("categories")

// 获取商品分类列表
export const getCate = (params) => request.get("categories", { params })

// 新增分类
export const addCate = (data) => request.post("categories", data)

// 删除分类
export const deleteCate = (id) => request.delete(`categories/${id}`)


// 获取商品参数
export const getCateAttr = (id, params) => request.get(`categories/${id}/attributes`, { params })

// 新增参数
export const addAttr = (id, data) => request.post(`categories/${id}/attributes`, data)

// 编辑参数 、新增tag
export const editAttr = (cateId, attr_id, data) =>
	request.put(`categories/${cateId}/attributes/${attr_id}`, data)

// 删除参数
export const deleteAttr = (cateId, id) => request.delete(`categories/${cateId}/attributes/${id}`)
