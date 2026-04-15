export class TaskSplitter {
  split(task) {
    console.log("[TaskSplitter] Splitting large task into chunks");
    return [
      { part: "backend", content: task.content },
      { part: "frontend", content: task.content }
    ];
  }
}
