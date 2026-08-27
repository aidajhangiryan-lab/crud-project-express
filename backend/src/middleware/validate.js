function validateTask(req, res, next) {
  const { title, description } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "title обязателен" });
  }

  if (description && description.length > 1000) {
    return res
      .status(400)
      .json({ error: "description не может быть длиннее 1000 символов" });
  }

  next();
}

function validateId(req, res, next) {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "id должен быть числом" });
  }

  next();
}

module.exports = { validateTask, validateId };
