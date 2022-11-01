import Brand from "../entities/brand";

export interface IBrandPresentation {
  id: string;
  name: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

const brandPresentation = ({
  id,
  name,
  createdAt,
  updatedAt,
}: Brand): IBrandPresentation => ({
  id,
  name,
  createdAt,
  updatedAt,
});

export default brandPresentation;
