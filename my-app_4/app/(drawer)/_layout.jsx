import {Drawer} from "expo-router/drawer"

export default function DrawerLayout () {
    return (
        <Drawer>
            <Drawer.Screen name="(tabs)" options={{
                title: "Jivan's Tab",
                drawerLabel: "Tab"
            }}/>

            <Drawer.Screen name="setting" options={{
                title: "Jivan's Setting",
                drawerLabel: "Jivan"
            }} />

        </Drawer>
    )
}