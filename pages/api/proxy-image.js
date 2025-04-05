export default async function handler(req, res) {
  const url = "http://18.195.234.74:8888/ReportHistory-89325104.png";

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Imagem não encontrada");

    const buffer = await response.arrayBuffer();
    res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.status(200).send(Buffer.from(buffer));
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter a imagem" });
  }
}
