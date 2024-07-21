import { Client, ID,Databases,Storage,Query } from "appwrite";
import conf from "../conf/conf";




export class Service
{
    client=new Client();
     databases;
    bucket;

    constructor()
    {
        this.client.setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteBucketId);

        this.databases=new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage,status,userId})
    {
        try {
           return await this.databases.createDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                })
        } catch (error) {
            console.log("error ",error);
        }
    }

    async updatePost(slug,{title,content,featuredImage,status})
    {
        try {
            
                return await this.databases.updateDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteBucketId,
                    slug,
                    {
                        title,
                        content,
                        featuredImage,
                        status
                    }
                )

        } catch (error) {
            console.log("error ",error);
        }
    }

    async getPost(slug)
    {
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug);
        }
        catch(error)
        {
            
            console.log("Error ",error);
            return false;
        }
    }

    async getPosts(queries=[Query.equal("status","active")])
        {
            try {
                return await this.databases.listDocuments(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    queries
                )

            } catch (error) {
                console.log("error ",error.message );
                return false;
            }
        }

    async deletePost(slug)
    {
        try {
           await this.databases.deleteDocument(slug);
        } catch (error) {
            console.log("Error ",error);
            return false;
        }
    }

        // storage of image
        async uploadFile(file)
        {
            try {
                return await this.bucket.createFile(
                    conf.appwriteBucketId,
                    ID.unique(),
                    file
                )
            } catch (error) {
                console.log("Error ",error);
                return false
            }
        }


        async deleteFile(fileId)
        {
            try {
              await  this.bucket.deleteFile(
                    conf.appwriteBucketId,
                    fileId
                )
            } catch (error) {
                console.log("Error ",error);
                return false
            }
        }

        async getFilePreview(fileId)
        {
            try {
                return this.bucket.getFilePreview(
                    conf.appwriteBucketId,
                    fileId
                )
            } catch (error) {
                console.log("Error ",error);
                
            }
        }
}


const service = new Service();

export default service;