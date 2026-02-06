function fetchUserData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: 1,
                name: "Rahul",
                role: "Student"
            });
        }, 2000);
    });
}

async function getUser() {
    console.log("Fetching user data...");

    const user = await fetchUserData();

    console.log("User data received:");
    console.log(user);
}

getUser();
