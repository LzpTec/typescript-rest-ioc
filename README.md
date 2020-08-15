# Typescript-Rest with IoC

After install Typescript-Rest, install the IoC container and the serviceFactory for the IoC Container

```bash
npm install typescript-rest --save
npm install typescript-ioc --save
npm install typescript-rest-ioc --save
```

From github:

```bash
npm install https://github.com/LzpTec/typescript-rest.git --save
npm install https://github.com/LzpTec/typescript-ioc.git --save
npm install https://github.com/LzpTec/typescript-rest-ioc.git --save
```

Then add a rest.config file in the root of your project:

```json
{
  "serviceFactory": "typescript-rest-ioc"
}
```

And you can use Injections, Request scopes and all the features of the IoC Container. It is possible to use it with any other IoC Container, like Inversify.

Example:

```typescript
class HelloService {
  sayHello(name: string) {
    return "Hello " + name;
  }
}

@Path("/hello")
class HelloRestService {
  @Inject
  private helloService: HelloService;

  @Path(":name")
  @GET
  sayHello( @PathParam('name') name: string): string {
    return this.sayHello(name);
  }
}
```
