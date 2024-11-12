import { auth as middleware } from "@/lib/auth";

export default middleware((req) => {
    const restrictedRoutes = [
        '/admin/',
    ]

    const restrictedAPIRoutes = [
        '/api/admin/',
    ]

    const isRestrictedRoutes = !!restrictedRoutes.find(route => req.nextUrl.pathname.startsWith(route.toLowerCase()));

    if (!req.auth && isRestrictedRoutes) {
        const newUrl = new URL("/admin", req.nextUrl.origin);
        return Response.redirect(newUrl);
    }

    const isRestrictedAPIRoutes = !!restrictedRoutes.find(route => req.nextUrl.pathname.startsWith(route.toLowerCase()));
    if (!req.auth && isRestrictedRoutes) {
        return Response.json({ message: "Not authenticated" }, { status: 401 })
    }

});
