import React from "react";
import { weightUnits } from "../Services/functions";

interface UserPreferences {
    weightUnit: weightUnits,
    setUnit?: () => void
}

const UserContext = React.createContext<UserPreferences>({ weightUnit: 'kg' });

export default UserContext;
