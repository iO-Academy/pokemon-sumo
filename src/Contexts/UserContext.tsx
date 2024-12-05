import React from "react";
import { weightUnits } from "../Services/functions";

interface UserPreferences {
    weightUnit: weightUnits
}

const UserContext = React.createContext<UserPreferences>({ weightUnit: 'kg' });

export default UserContext;
