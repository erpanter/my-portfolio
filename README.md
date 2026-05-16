# Personal Portfolio

A modern full-stack portfolio platform built with React and AWS cloud services, featuring a secure admin dashboard, serverless backend architecture, and cloud-based media management.

## Live Demo

https://main.d3dtch9735w75n.amplifyapp.com/

---

# Tech Stack

### Frontend
- React (Vite)
- TailwindCSS
- React Router

### Backend / Cloud
- AWS Lambda
- API Gateway
- Amazon DynamoDB
- Amazon S3
- Amazon Cognito
- AWS Amplify

---

# Features

## Public Portfolio
- Responsive modern UI
- Interactive project showcase
- Photography gallery
- Dynamic content loading from cloud backend

## Admin Dashboard
- Secure authentication with Amazon Cognito
- Protected admin portal
- Add / edit / delete projects
- Add / delete photography uploads
- Persistent cloud database storage

## Cloud Infrastructure
- Serverless backend architecture
- Secure signed URL uploads to Amazon S3
- REST API powered by API Gateway + Lambda
- Hosted and deployed with AWS Amplify

---

# Architecture

```text
Frontend (React + Amplify)
        ↓
API Gateway
        ↓
AWS Lambda
   ↙         ↘
DynamoDB      Amazon S3