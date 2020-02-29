import bcrypt from 'bcryptjs'
import validator from 'validator'
import jwt from 'jsonwebtoken'

import { User } from '../models/User'
import { Post } from '../models/Post'

export const bresolver = {
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
    // If input is valid, we can create a new post
    const post = new Post({
        content: postInput.content,
        imageURL: postInput.imageURL
    })

    const createdPost = await post.save()

    // Add post to user's posts
    return {
        ...createdPost._doc, 
        _id: createdPost._id.toString(), 
        createdAt: createdPost.createdAt.toISOString(),
        updatedAt: createdPost.updatedAt.toISOString()
    }
  }
}