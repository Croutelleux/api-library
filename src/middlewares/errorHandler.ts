import { Request, Response, NextFunction } from "express";

// Interface pour les erreurs
interface Error {
  status?: number;
  message?: string;
}

// Middleware pour gérer les erreurs
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  console.error("An error occurred:", err);

  // Définir un statut d'erreur par défaut
  const statusCode = err.status || 500;

  if (statusCode === 400 && "fields" in err) {
    for (let key in err.fields as string[]) {
      let request: any = (err.fields as any[])[key];
      if ("message" in request && "value" in request) {
        err.message =
          key.replace("requestBody.", "") +
          " " +
          request.value +
          " " +
          request.message;
      }
    }
  }

  const message = err.message || "Internal Server Error";

  // Envoyer la réponse d'erreur au client
  res.status(statusCode).json({
    status: statusCode,
    message: message,
  });
};

export default errorHandler;
