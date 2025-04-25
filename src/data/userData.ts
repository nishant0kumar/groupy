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
            name: "Entertainment",
            links: [
                {
                    name: "Netflix",
                    url: "https://netflix.com",
                    clickCount: 15
                },
                {
                    name: "YouTube",
                    url: "https://youtube.com",
                    clickCount: 45
                },
                {
                    name: "Spotify",
                    url: "https://spotify.com",
                    clickCount: 23
                },
                {
                    name: "Hotstar",
                    url: "https://hotstar.com",
                    clickCount: 23
                },
                {
                    name: "Hulu",
                    url: "https://hulu.com",
                    clickCount: 15
                },
                {
                    name: "Disney+",
                    url: "https://disneyplus.com",
                    clickCount: 15
                },
                {
                    name: "Prime Video",
                    url: "https://primevideo.com",
                    clickCount: 15
                },
                {
                    name: "Apple TV+",
                    url: "https://appletvplus.com",
                    clickCount: 15
                },
                {
                    name: "JioCinema",
                    url: "https://jiocinema.com",
                    clickCount: 15
                }
            ]
        },
        {
            name: "Study",
            links: [
                {
                    name: "Coursera",
                    url: "https://coursera.org",
                    clickCount: 12
                },
                {
                    name: "Khan Academy",
                    url: "https://khanacademy.org",
                    clickCount: 8
                },
                {
                    name: "MDN Web Docs",
                    url: "https://developer.mozilla.org",
                    clickCount: 30
                }
            ]
        },
        {
            name: "Development",
            links: [
                {
                    name: "GitHub",
                    url: "https://github.com",
                    clickCount: 67
                },
                {
                    name: "Stack Overflow",
                    url: "https://stackoverflow.com",
                    clickCount: 42
                },
                {
                    name: "CodePen",
                    url: "https://codepen.io",
                    clickCount: 19
                }
            ]
        },
        {
            name: "Social",
            links: [
                {
                    name: "Twitter",
                    url: "https://twitter.com",
                    clickCount: 15
                },
                {
                    name: "Instagram",
                    url: "https://instagram.com",
                    clickCount: 15
                },
                {
                    name: "LinkedIn",
                    url: "https://linkedin.com",
                    clickCount: 15
                },
                {
                    name: "Reddit",
                    url: "https://reddit.com",
                    clickCount: 15
                },
                {
                    name: "Facebook",
                    url: "https://facebook.com",
                    clickCount: 15
                }
            ]
        },
        {
            name: "Shopping",
            links: [
                {
                    name: "Amazon",
                    url: "https://amazon.com",
                    clickCount: 15
                },
                {
                    name: "Flipkart",
                    url: "https://flipkart.com",
                    clickCount: 15
                },
                {
                    name: "Myntra",
                    url: "https://myntra.com",
                    clickCount: 15
                },
                {
                    name: "Ajio",
                    url: "https://ajio.com",
                    clickCount: 15
                }
            ]
        },
        {
            name: "Food",
            links: [
                {
                    name: "Zomato",
                    url: "https://zomato.com",
                    clickCount: 15
                },
                {
                    name: "Swiggy",
                    url: "https://swiggy.com",
                    clickCount: 15
                },
                {
                    name: "Foodpanda",
                    url: "https://foodpanda.com",
                    clickCount: 15
                }
            ]
        },
        {
            name: "Travel",
            links: [
                {
                    name: "BookMyShow",
                    url: "https://bookmyshow.com",
                    clickCount: 15
                },
                {
                    name: "MakeMyTrip",
                    url: "https://makemytrip.com",
                    clickCount: 15
                }
            ]
        },
        {
            name: "AI",
            links: [
                {
                    name: "ChatGPT",
                    url: "https://chatgpt.com",
                    clickCount: 15
                },
                {
                    name: "Google AI",
                    url: "https://ai.google.com",
                    clickCount: 15
                },
                {
                    name: "OpenAI",
                    url: "https://openai.com",
                    clickCount: 15
                }
            ]
        },
        {
            name: "Chatting",
            links: [
                {
                    name: "Whatsapp",
                    url: "https://whatsapp.com",
                    clickCount: 15
                },
                {
                    name: "Telegram",
                    url: "https://telegram.org",
                    clickCount: 15
                },
                {
                    name: "Discord",
                    url: "https://discord.com",
                    clickCount: 15
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
export const incrementClickCount = (categoryName: string, linkName: string): void => {
    const category = userData.categories.find(cat => cat.name === categoryName);
    const link = category?.links.find(link => link.name === linkName);
    if (link) {
        link.clickCount++;
        saveUserData(userData); // Save updated data to local storage
    }
};

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