import {account, appwriteConfig, database} from "~/appwrite/client";
import {ID, OAuthProvider, Query} from "appwrite";
import {redirect} from "react-router";

export const loginWithGoogle = async() => {
    try {
        account.createOAuth2Session(OAuthProvider.Google, `${window.location.origin}/`,
            `${window.location.origin}/404`
            );
    } catch (e) {
        console.error("Error during OAuth2 session creation:", e);
    }
}

// untuk mengget user
export const getUser = async() => {
    try {
        const user = await account.get();

        if(!user) return redirect("/sign-in");

        const { documents } = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [
                Query.equal("accountId", user.$id),
                Query.select(["name", "email", "imageUrl", "joinedAt", "accountId"])
            ]
        );

        return documents.length > 0 ? documents[0] : redirect("/sign-in");
    } catch (e) {
        console.error("Error fetching user:", e);
        return null;
    }
}

export const logoutUser = async() => {
    try {
        await account.deleteSession("current");
    } catch (e) {
        console.error("Error during logout:", e);
    }
}

// untuk mengget user profiile foto
export const getGooglePicture = async(accessToken: string) => {
    try {
        const response = await fetch("https://people.googleapis.com/v1/people/me?personFields=photos", {
            headers: { Authorization: `Bearer ${accessToken}`}
        });
        if(!response.ok) throw new Error("Failed to fetch Google profile picture");

        const { photos } = await response.json();
        return photos?.[0]?.url || null;
    } catch (e) {
        console.error("Error fetching Google pictures", e);
        return null;
    }
}

// untuk mengget user yang sudah ada
export const getExistingUser = async(id: string) => {
    try {
        const { documents, total } = await  database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId", id)]
        );

        return total > 0 ? documents[0] : null;
    } catch (e) {
        console.error("Error fetching user:", e);
        return null;
    }
}

// simpan data user yang login ke db
export const storeUserData = async() => {
    try {
        const user = await account.get();
        if(!user) throw new Error("User not found");

        const { providerAccessToken } = (await account.getSession("current")) || {}
        const profilePicture = providerAccessToken
            ? await getGooglePicture(providerAccessToken)
            : null;

        const createdUser = await  database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: user.$id,
                email: user.email,
                name: user.name,
                imageUrl: profilePicture,
                joinedAt: new Date().toISOString(),
            }
        );

        if(!createdUser.$id) redirect("/sign-in");
    } catch (e) {
        console.error("Error storing user data:", e);
    }
}