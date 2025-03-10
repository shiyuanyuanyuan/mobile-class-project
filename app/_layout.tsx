import { Redirect, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { Slot, useSegments } from "expo-router";
import { auth } from "@/Firebase/firebaseSetup";
import { onAuthStateChanged } from "firebase/auth";
import { router } from "expo-router";

export default function Layout() {
    const segments = useSegments();

    const [userLoggedIn, setUserLoggedIn] = useState(false);

    // check if user is logged in
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserLoggedIn(true);
            } else {
                setUserLoggedIn(false);
            }
        })
        return () => unsubscribe();
    }, [])

    useEffect(() => {
        if (userLoggedIn && segments[0] === "(auth)") {
            router.replace("/(protected)/")
        } else if (!userLoggedIn && segments[0] !== "(auth)") {
            router.replace("/(auth)/login")
        }
    }, [userLoggedIn])

    return <Slot />
}

