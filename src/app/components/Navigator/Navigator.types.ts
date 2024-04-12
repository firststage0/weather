export type NavigatorType = {
    permissions: PermissionType;
    geolocation: GeolocationType;
}

type PermissionType = {
    revoke: any;
}

type GeolocationType = {
    getCurrentPosition: number;
}