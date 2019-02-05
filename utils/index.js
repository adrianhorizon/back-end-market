export const handleError = (error, res) => {
    res.status(500).json({error})
  }
  