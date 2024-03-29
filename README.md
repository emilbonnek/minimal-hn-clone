# Minimal Hacker News Clone task

Live demo: [https://minimal-hn-clone.vercel.app](https://minimal-hn-clone.vercel.app)

![Website](https://img.shields.io/website?url=https%3A%2F%2Fminimal-hn-clone.vercel.app)

In my solution I have added a few features to the original task. I have added a navigation menu with links to the top, new and best stories. I have also added a form for setting the sorting order. My purpose with this was to make it feel more like a real application, and less like just a simple list of stories.

I have also neglected one of the requirements in the task, because I think it provides a worse user experience than the alternative. The requirement states that "[...] your website should not present any data until all is collected". In my solution I have chosen to present the stories once all 10 are downloaded, but the authors karma score will lazily load in on the story (without causing layout shifts of course). In modern web applications, especially public ones, I believe it is important to minimize network waterfalls and get something on the screen as soon as possible. Since there is already a waterfall starting with /topstories and then the individual stories, I think it is better to present the stories as soon as they are available in this case.

## Running the project

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

## Tools and Dependencies

I have chosen to use [Vite](https://vitejs.dev/) with [React](https://react.dev/) for this task. On top of React I have used [Tanstack Router](https://tanstack.com/router) for type-safe routing including handling of query parameters as state. I have used [Tanstack/React Query]() for fetching and caching the stories and authors. [Tailwind CSS](https://tailwindcss.com/) is used for styling. My solution is written in [TypeScript](https://www.typescriptlang.org/), and I have used [Valibot](https://valibot.dev/) (a modern alternative to Zod) for runtime schema validation.
