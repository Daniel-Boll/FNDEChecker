import { Test, TestingModule } from "@nestjs/testing";
import { HttpStatus, INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";
import { GroupModule } from "./../src/group/group.module";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it.todo("/login (POST)");
});

describe("GroupController (e2e)", () => {
  let group: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [GroupModule],
    }).compile();

    group = moduleFixture.createNestApplication();
    await group.init();
  });

  it("/group/ (POST)", async () => {
    const data = {
      email: "mygroup@pet.com",
      password: "groupPassword",
      groupname: "groupName",
      IES: "groupIES",
      UF: "groupUF",
      city: "groupCity",
    };

    const res = await request(group.getHttpServer()).post("/group/").send(data);

    console.log(res.body);
    expect(res.status).toEqual(HttpStatus.CREATED);
  });

  it("/group/ (GET)", async () => {
    const res = await request(group.getHttpServer()).get("/group/");

    console.log(res.body);
  });
});
