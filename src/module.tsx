import { PanelPlugin } from '@grafana/data';
import {
  commonOptionsBuilder,
  LegendDisplayMode,
  TooltipDisplayMode,
  OptionsWithLegend,
  OptionsWithTooltip,
} from '@grafana/ui';
import { SimplePanel } from './SimplePanel';
import { defaultGraphConfig, getGraphFieldConfig } from './graphConfig';
import { GraphFieldConfig } from '@grafana/ui';

export interface SimpleOptions extends OptionsWithLegend, OptionsWithTooltip {
  imageUrl: string;
  imageOpacity: number;
  imageFit: string;
  imagePosition: string;
}

export const plugin = new PanelPlugin<SimpleOptions, GraphFieldConfig>(SimplePanel)
  .useFieldConfig(getGraphFieldConfig(defaultGraphConfig))
  .setDefaults({
    imageUrl: '',
    imageOpacity: 0.22,
    imageFit: 'contain',
    imagePosition: 'center',
    legend: {
      showLegend: true,
      displayMode: LegendDisplayMode.List,
      placement: 'bottom',
      calcs: [],
    },
    tooltip: {
      mode: TooltipDisplayMode.Single,
    },
  })
  .setPanelOptions(builder => {
    builder.addTextInput({
      path: 'imageUrl',
      name: 'URL da imagem PNG',
      description: 'URL direta para uma imagem acessível pelo navegador',
      defaultValue: '',
    });

    builder.addNumberInput({
      path: 'imageOpacity',
      name: 'Transparência da imagem',
      description: '0 = invisível; 1 = totalmente opaca',
      defaultValue: 0.22,
      settings: {
        min: 0,
        max: 1,
        step: 0.05,
      },
    });

    builder.addSelect({
      path: 'imageFit',
      name: 'Enquadramento da imagem',
      description: 'Define como a imagem se ajusta ao painel',
      defaultValue: 'contain',
      settings: {
        options: [
          { label: 'Conter (imagem inteira)', value: 'contain' },
          { label: 'Cobrir (preenche o painel)', value: 'cover' },
          { label: 'Esticar (preenche sem preservar proporção)', value: 'fill' },
        ],
      },
    });

    builder.addSelect({
      path: 'imagePosition',
      name: 'Posição da imagem',
      description: 'Define o posicionamento da imagem dentro do painel',
      defaultValue: 'center',
      settings: {
        options: [
          { label: 'Centro', value: 'center' },
          { label: 'Topo', value: 'top' },
          { label: 'Base', value: 'bottom' },
          { label: 'Esquerda', value: 'left' },
          { label: 'Direita', value: 'right' },
          { label: 'Canto superior esquerdo', value: 'left top' },
          { label: 'Canto superior direito', value: 'right top' },
          { label: 'Canto inferior esquerdo', value: 'left bottom' },
          { label: 'Canto inferior direito', value: 'right bottom' },
        ],
      },
    });

    commonOptionsBuilder.addTooltipOptions(builder);
    commonOptionsBuilder.addLegendOptions(builder);
  });
