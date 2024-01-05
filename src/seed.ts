// import db from "./utils/db.server";

// function getAuthors(): Author[] {
//   return [
//     {
//       full_name: "sheraz",
//       bio: "xyz",
//       followers_count: 1,
//       following_count: 2,
//     },
//     {
//       full_name: "Shahmeer",
//       bio: "fas",
//       followers_count: 112,
//       following_count: 122,
//     },
//     {
//       full_name: "Ali",
//       bio: "fsa",
//       followers_count: 12,
//       following_count: 221,
//     },
//   ];
// }

// function getBooks(): Book[] {
//   return [
//     {
//       title: "string",
//       is_fiction: true,
//       date_published: new Date(),
//     },
//     {
//       title: "as",
//       is_fiction: false,
//       date_published: new Date(),
//     },
//     {
//       title: "asf",
//       is_fiction: true,
//       date_published: new Date(),
//     },
//   ];
// }

// async function seed(): Promise<void> {
//   await Promise.all(
//     getAuthors().map((author) => {
//       return db.author.create({
//         data: {
//           full_name: author.full_name,
//           followers_count: author.followers_count,
//           following_count: author.following_count,
//           bio: author.bio,
//         },
//       });
//     })
//   );

//   let author = await db.author.findFirst({
//     where: {
//       full_name: "sheraz",
//     },
//   });
//   console.log(author);
//   await Promise.all(
//     getBooks().map((books) => {
//       return db.book.create({
//         data: {
//           title: books.title,
//           is_fiction: books.is_fiction,
//           date_published: books.date_published,
//           author_id: author!.profile_id,
//         },
//       });
//     })
//   );
// }
// seed();
