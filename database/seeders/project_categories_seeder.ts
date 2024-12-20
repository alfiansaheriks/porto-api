import ProjectCategory from "#models/project_category";
import { BaseSeeder } from "@adonisjs/lucid/seeders";

export default class extends BaseSeeder {
  async run() {
    await ProjectCategory.createMany([
      {
        name: "Web Development",
      },
      {
        name: "Mobile Development",
      },
      {
        name: "Desktop Development",
      },
      {
        name: "Machine Learning",
      },
      {
        name: "Data Science",
      },
    ]);
  }
}
