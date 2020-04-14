import bcrypt from 'bcryptjs'
import validator from 'validator'
import jwt from 'jsonwebtoken'

import { User } from '../models/User'
import { Post } from '../models/Post'

export const bresolver = {

    getUser: async function ({ _id }, req) {
        const user = await User.findById(_id)

        return user
    },

    createUser: async function ({ userInput }, req) {

        // Validation

        // Make a stack of errors
        const errors = []

        if (!validator.isEmail(userInput.email)) {
            errors.push({
                message: 'Email is invalid.'
            })
        }

        if (
            validator.isEmpty(userInput.password)|| 
            !validator.isLength(userInput.password, { min: 5} )
            ){
            errors.push({
                message: 'Password must be at least 5 characters.'
            })
        }

        if (errors.length > 0) {
            const error = new Error('Invalid input.')
            throw error
        }

        // Check to see if a user with that email already exists; if so, throw an error
        const existingUser = await User.findOne({email: userInput.email})

        if (existingUser) {
            const error = new Error('User already exists!')
            error.data = errors
            error.code = 422
            throw error
        }

        // Encrypt the password
        const hashedPw = await bcrypt.hash(userInput.password, 12)

        // Create a new user
        const user = new User ({
            email: userInput.email,
            firstName: userInput.firstName,
            lastName: userInput.lastName,
            password: hashedPw
        })
        
        // Store the new user in the database
        const createdUser = await user.save()

        /* 
            Return a createdUser object without all of the metadata Mongoose creates,
            and convert the _id to a string, otherwise it will fail
        */
        return {
            ...createdUser._doc,
            _id: createdUser._id.toString()
        }
    },
    
    updateUser: async function ({ userInput }, req) {
        if (!req.isAuth) {
            const error = new Error('Not Authenticated')
            error.code = 401
            throw error
        }

        const user = await User.findById(req.userId)

        if (!user) {
            const error = new Error('No user found!')
            error.code = 401
            throw error
        }

        // Validation

        // Make a stack of errors
        const errors = []

        if (!validator.isEmail(userInput.email)) {
            errors.push({
                message: 'Email is invalid.'
            })
        }

        if (validator.isEmpty(userInput.firstName)) {
            errors.push({ message: 'First name required.'})
        }

        if (validator.isEmpty(userInput.lastName)) {
            errors.push({ message: 'Last name required.' })
        }

        user = userInput
    
        const updatedUser = await user.save()

        return {
            ...updatedUser._doc,
            _id: updatedUser._id.toString()
        }
    },

    login: async function ({ email, password }) {
        const user = await User.findOne({ email: email })
        
        if (!user) {
            const error = new Error('User not found')
            error.code = 401
            throw error
        }

        const isEqual = await bcrypt.compare(password, user.password)
        if(!isEqual) {
            const error = new Error('Password is incorrect')
            error.code = 401
            throw error
        }
        
        const token = jwt.sign({
                userId: user._id.toString(),
                email: user.email
            },
                
            'somesupersecretstringcheckoutthedocsfordoingthisright',
            {
                expiresIn: '1h'
            }
        )
        
        return { 
            token: token, 
            userId: user._id.toString()
        }
    },
  
    createPost: async function ({ postInput }, req) {
        // Check isAuth to see if the user is authenticated

        const creatorId = postInput.creatorId 

        if (!req.isAuth) {
            const error = new Error('Not Authenticated')
            error.code = 401
            throw error
        }

        const errors = []
        if (validator.isEmpty(postInput.content)) {
            errors.push({ message: 'No content in post' })
        }
        if (errors.length > 0) {
            const error = new Error('Invalid input.')
            error.data = errors
            error.code = 422
            throw error
        }
    
        // Get the post's creator
        const user = await User.findById(creatorId)
        
        // If there is no user, something went wrong; throw an error
        if (!user) {
            const error = new Error('Invalid User')
            error.code = 401
            throw error
        }
        
        // If we have an authenticated user and valid input, create a new post
        const post = new Post({
            content: postInput.content,
            // imageURL: postInput.imageURL,
            creator: user
        })

        const createdPost = await post.save()
        
        // Push the new post to the creating user's posts
        user.posts.push(createdPost)
        await user.save()
        
        return {
            ...createdPost._doc, 
            _id: createdPost._id.toString(), 
            createdAt: createdPost.createdAt.toISOString(),
            updatedAt: createdPost.updatedAt.toISOString()
        }    
    },
  
    posts: async function ({ page }, req) {

        if (!req.isAuth) {
            const error = new Error('Not Authenticated')
            error.code = 401
            throw error
        }

        // Pagination

        if (!page) {
            page = 1
        }

        const perPage = 10 //hardcode this for now

        const totalPosts = await Post.find().countDocuments()
        const posts = await Post
        .find()
            .sort({ createdAt: -1 })
            .skip((page - 1) * perPage)
            .limit(perPage)
        .populate('creator')
        
        return {
            posts: posts.map(p => {
                return {
                    ...p._doc,
                    id: p._id.toString(),
                    createdAt: p.createdAt.toISOString(),
                    updatedAt: p.updatedAt.toISOString()
                }
            }),
            totalPosts: totalPosts
        }
    },

    updatePost: async function ({ id, postInput }, req) {
        
        if (!req.isAuth) {
            const error = new Error('Not Authenticated')
            error.code = 401
            throw error
        }

        const userId = postInput.creatorId

        const post = await Post.findById(id).populate('creator')

        if (!post) {
            const error = new Error('No post found!')
            error.code = 401
            throw error
        }

        if (post.creator._id.toString() !== userId.toString()) {
            const error = new Error('Not authorized!')
            error.code = 403
            throw error            
        }

        // Validation

        const errors = []
        if (validator.isEmpty(postInput.content)) {
            errors.push({ message: 'No content in post' })
        }

        if (errors.length > 0) {
            const error = new Error('Invalid input.')
            error.data = errors
            error.code = 422
            throw error
        }

        post.content = postInput.content
        if (postInput.imageUrl !== 'undefined') {
            post.imageUrl = postInput.imageUrl
        }

        const updatedPost = await post.save()

        return {
            ...updatedPost._doc,
            _id: updatedPost._id.toString(),
            createdAt: updatedPost.createdAt.toISOString(),
            updatedAt: updatedPost.updatedAt.toISOString()
        }
    },

    deleteOnePost: async function({ id }, req) {

        if (!req.isAuth) {
            const error = new Error('Not Authenticated')
            error.code = 401
            throw error
        }

        const post = await Post.findById(id)

        if (!post) {
            const error = new Error('No post found!')
            error.code = 401
            throw error
        }

        if (post.creator.toString() !== req.userId.toString()) {
            const error = new Error('Not authorized!')
            error.code = 403
            throw error
        }

        await Post.findByIdAndRemove(id, { useFindAndModify: false })
        // Remove the post from the user's post list
        const user = await User.findById(req.userId)
        user.posts.pull(id)
        await user.save()
        return true
    }
    
}