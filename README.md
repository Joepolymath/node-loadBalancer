# Node Load Balancer

This is my node js implementation of a load balancer. This load balancer is designed to efficiently distribute incoming traffic among multiple backend servers, ensuring high availability and optimal performance for your applications.

## Getting Started

To get started with the Node Load Balancer, follow these simple steps:

### 1. Clone the Repository

Clone the repository to your local machine using Git:

```sh
git clone git@github.com:Joepolymath/node-loadBalancer.git
```

### 2. Install Dependencies

Install all required dependencies using your preferred package manager (in this project, we use pnpm):

```sh
pnpm install
```

### 3. Set Up SSL

For enhanced security, this load balancer is designed to run on HTTPS. To set up SSL, follow these steps:

#### Create an 'ssl' Directory

```sh
mkdir src/ssl
```

#### Generate SSL Credentials

Navigate to the newly created 'ssl' directory:

```sh
cd src/ssl
```

Generate SSL credentials by running the following command and following the prompts:

```sh
openssl req -nodes -new -x509 -keyout key.pem -out cert.pem
```

#### Return to the Root Folder

```sh
cd ../..
```

### 4. Start Backend Servers

Spin up the child servers by running the following commands in separate terminal instances:

```sh
pnpm server1
pnpm server2
pnpm server3
```

These servers are the targets to which the load balancer will distribute incoming requests.

### 5. Launch the Load Balancer

Start the load balancer with the following command:

```sh
pnpm proxy
```

### 6. Test the Load Balancer

You can now test the load balancer by sending requests to:

```sh
https://localhost/app
```

Or by using curl:

```sh
curl -k https://localhost/app
```

This will distribute the requests among the child servers, demonstrating the load balancing functionality.

## Health Checks

You can monitor the health status of the child servers in two ways: using HTTP or TCP protocols.

### TCP Health Check

To check the health status of the child servers using TCP, run the following command:

```sh
curl -k https://localhost/health/tcp
```

### HTTP Health Check

To check the health status of the child servers using HTTP, run the following command:

```sh
curl -k https://localhost/health/http
```

Feel free to add as many servers as needed to scale your application seamlessly.

Enjoy an optimized and resilient application infrastructure.

Cheers! 🤓

---

Joshua Ajagbe
