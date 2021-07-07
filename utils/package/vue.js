import { h, render } from 'vue';
/**
 * 新增动态类型的vuex模块
 * @param store
 * @returns store
 */
export const createModule = (store) => store;
/**
 * 递归处理路由高亮信息
 * @param routes 当前路由列表
 * @param upperPath 上层路由路径
 */
export const calculRouterActive = (routes, upperPath) => {
    let pathMaps = [];
    const recursion = (routes, upperPath) => {
        for (const i in routes) {
            const route = routes[i];
            // 拼接路由绝对路径
            const completePath = upperPath
                ? `${upperPath == '/' ? '/' : upperPath + '/'}${route.path}`
                : route.path;
            // 记录路由路径信息
            pathMaps.push(completePath);
            // 添加路由路径信息
            if (route.meta) {
                route.meta.pathMaps = pathMaps;
                route.meta.completePath = completePath;
            }
            else {
                route.meta = { pathMaps, completePath };
            }
            // 再次递归
            if (Array.isArray(route.children)) {
                recursion(route.children, completePath);
            }
            else {
                pathMaps = [];
            }
        }
    };
    recursion(routes, upperPath);
};
/**
 * 递归输出当前路由权限表
 * @param routes 当前路由列表
 */
export const outputRoutes = (routes) => {
    const recursion = (rs) => {
        return rs.map((route) => {
            var _a;
            const newRoute = {
                name: (_a = route.meta) === null || _a === void 0 ? void 0 : _a.title
            };
            if (route.children) {
                newRoute.children = recursion(route.children);
            }
            return newRoute;
        });
    };
    console.log(JSON.stringify(recursion(routes)));
};
/**
 * 递归对比路由权限表, 返回路由列表
 * @param baseRoutes 基本路由
 * @param surfaceRoutes 对比路由信息
 * @returns 比较路由列表
 */
export const compareRoutes = (baseRoutes = [], surfaceRoutes = []) => {
    const filterRoutes = baseRoutes.filter((brte) => {
        var _a;
        const srte = surfaceRoutes.find((v) => { var _a; return ((_a = brte.meta) === null || _a === void 0 ? void 0 : _a.title) === v.title; });
        if (brte.children && ((_a = brte.children) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            brte.children = compareRoutes(brte.children, srte === null || srte === void 0 ? void 0 : srte.children);
        }
        return srte;
    });
    return filterRoutes;
};
/**
 * 递归设置默认重定向地址
 * @param routes 当前路由表
 * @param upperPath 上层路由路径
 */
export const setDefaultRoutes = (routes = [], upperPath) => {
    // 二层递归获取子项拼接路径
    const getChildrenCompletePath = (route) => {
        if (route === null || route === void 0 ? void 0 : route.children) {
            if (route.path == '/') {
                return getChildrenCompletePath(route.children[0]);
            }
            return `${route.path}/${getChildrenCompletePath(route.children[0])}`;
        }
        return route.path;
    };
    routes.forEach((route) => {
        if (!(route.children && route.children.length > 0))
            return false;
        // 当前完整地址
        const completePath = upperPath
            ? `${upperPath == '/' ? '' : upperPath + '/'}${route.path}`
            : route.path;
        // 当前拼接符
        const splic = route.path === '/' ? '' : '/';
        route.redirect = `${completePath}${splic}${getChildrenCompletePath(route.children[0])}`;
        // 再次递归设置重定向地址
        setDefaultRoutes(route.children, completePath);
    });
};
/**
 * 设置当前路由表默认路由路径 / => 第一路径
 */
export const setDefaultHomeRoute = (routes = []) => {
    const existHomeRoute = routes.some((v) => v.path === '/');
    if (existHomeRoute)
        return false;
    routes.unshift({ path: '/', redirect: routes[0].path });
};
/**
 * 渲染组件实例
 * @param Constructor 组件
 * @param props 组件参数
 * @returns 组件实例
 */
export const renderInstance = (Constructor, props) => {
    // 组件消失时, 移除当前实例
    props.onVanish = () => {
        render(null, container);
    };
    // 创建虚拟节点
    const container = document.createElement('div');
    const vnode = h(Constructor, props);
    // 渲染组件
    render(vnode, container);
    if (container.firstElementChild) {
        document.body.appendChild(container.firstElementChild);
    }
    // 这里不需要调用 document.body.removeChild(container.firstElementChild)
    // 因为调用 render(null, container) 为我们完成了这项工作
    return vnode.component;
};
//# sourceMappingURL=vue.js.map