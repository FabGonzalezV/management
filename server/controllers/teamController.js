 
import Team from "./../models/team.model";

export const getTeamById = async (req, res, next, id) => {
  try {
    const team = await Team.findById(id);
    if (!team) {
      return res.status(404).json({ errr: "team not found" });
    }

    req.team = team;

    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const createTeam = async (req, res) => {
  try {
    const { name, description, members } = req.body;
    const createdBy = req.profile._id;
    const newTeam = new Team({ name, description, createdBy, members });
    await newTeam.save();
    res.status(201).json(newTeam);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTeamById = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { name, description, members } = req.body;
    const updatedTeam = await Team.findByIdAndUpdate(
      teamId,
      { name, description, members },
      { new: true }
    );
    if (!updatedTeam) {
      return res.status(404).json({ err: "team not found" });
    }
    res.status(200).json(updatedTeam);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar team" });
  }
};

export const deleteTeamById = async (req, res) => {
  try {
    const { teamId } = req.params;
    const deletedTeam = await Team.findByIdAndDelete(teamId);
    if (!deleteTeam) {
      return res.status(404).json({ err: "team not found" });
    }
    res.status(200).json({ message: "team eliminada con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el team" });
  }
};

export const listTeams = async (req, res) => {
  try {
    const userId = req.params.userId;

    const teams = await Team.find({ createdBy: userId });

    return res.status(200).json(teams);
  } catch (error) {
    return res
      .status(500)
      .json({
        error: "Error al listar los equipos del usuario",
        details: error.message,
      });
  }
};
