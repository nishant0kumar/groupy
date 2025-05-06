interface WebLink {
    name: string;
    url: string;
    clickCount: number;
}

interface Category {
    name: string;
    links: WebLink[];
}

interface UserData {
    id: string;
    name: string;
    username: string;
    categories: Category[];
    users?: Array<{ username: string; name: string; }>;
}

const userData: UserData = {
    id: "usr_001",
    name: "Nishant Kumar",
    username: "amrood",
    categories: [
        {
            name: "Tools",
            links: [
                {
                    name: "Github",
                    url: "https://github.com/nishant0kumar",
                    clickCount: 0
                }
            ]
        },
        {
            name: "Socials",
            links: [
                {
                    name: "X",
                    url: "https://x.com/tnahsinramuk",
                    clickCount: 0
                }
            ]
        }
    ]
};
// Function to load user data from local storage
const loadUserData = (): UserData | null => {
    try {
        const serializedData = localStorage.getItem('userData');
        if (serializedData === null) {
            return null;
        }
        return JSON.parse(serializedData) as UserData;
    } catch (error) {
        console.error("Failed to load user data from local storage:", error);
        return null;
    }
};

// Function to save user data to local storage
const saveUserData = (data: UserData): void => {
    try {
        const serializedData = JSON.stringify(data);
        localStorage.setItem('userData', serializedData);
    } catch (error) {
        console.error("Failed to save user data to local storage:", error);
    }
};

// Load user data from local storage on application start
const storedUserData = loadUserData();
if (storedUserData) {
    userData.id = storedUserData.id;
    userData.name = storedUserData.name;
    userData.username = storedUserData.username;
    userData.categories = storedUserData.categories;
}

// Function to increment click count and save to local storage
/*export const incrementClickCount = (categoryName: string, linkName: string): void => {
    const category = userData.categories.find(cat => cat.name === categoryName);
    const link = category?.links.find(link => link.name === linkName);
    if (link) {
        link.clickCount++;
        saveUserData(userData); // Save updated data to local storage
    }
};*/

// Save user data to local storage whenever it changes (e.g., after incrementing click count)
saveUserData(userData);

/* // Helper function to increment click count
export const incrementClickCount = (categoryName: string, linkName: string): void => {
    const category = userData.categories.find(cat => cat.name === categoryName);
    const link = category?.links.find(link => link.name === linkName);
    if (link) {
        link.clickCount++;
    }
};
 */
export default userData; 
