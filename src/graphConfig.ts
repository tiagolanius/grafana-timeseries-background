import { SetFieldConfigOptionsArgs } from '@grafana/data';
import {
  BarAlignment,
  DrawStyle,
  GraphFieldConfig,
  graphFieldOptions,
  GraphGradientMode,
  LineInterpolation,
  PointVisibility,
  StackingMode,
  commonOptionsBuilder,
} from '@grafana/ui';

export const defaultGraphConfig: GraphFieldConfig = {
  drawStyle: DrawStyle.Line,
  lineInterpolation: LineInterpolation.Linear,
  lineWidth: 1,
  fillOpacity: 0,
  gradientMode: GraphGradientMode.None,
  barAlignment: BarAlignment.Center,
  showPoints: PointVisibility.Auto,
  pointSize: 5,
  stacking: {
    mode: StackingMode.None,
    group: 'A',
  },
};

export function getGraphFieldConfig(cfg: GraphFieldConfig): SetFieldConfigOptionsArgs<GraphFieldConfig> {
  const category = ['Graph styles'];

  return {
    useCustomConfig: builder => {
      builder
        .addRadio({
          path: 'drawStyle',
          name: 'Style',
          category,
          defaultValue: cfg.drawStyle,
          settings: { options: graphFieldOptions.drawStyle },
        })
        .addRadio({
          path: 'lineInterpolation',
          name: 'Line interpolation',
          category,
          defaultValue: cfg.lineInterpolation,
          settings: { options: graphFieldOptions.lineInterpolation },
          showIf: c => c.drawStyle === DrawStyle.Line,
        })
        .addRadio({
          path: 'barAlignment',
          name: 'Bar alignment',
          category,
          defaultValue: cfg.barAlignment,
          settings: { options: graphFieldOptions.barAlignment },
          showIf: c => c.drawStyle === DrawStyle.Bars,
        })
        .addSliderInput({
          path: 'lineWidth',
          name: 'Line width',
          category,
          defaultValue: cfg.lineWidth,
          settings: { min: 0, max: 10, step: 1 },
          showIf: c => c.drawStyle !== DrawStyle.Points,
        })
        .addSliderInput({
          path: 'fillOpacity',
          name: 'Fill opacity',
          category,
          defaultValue: cfg.fillOpacity,
          settings: { min: 0, max: 100, step: 1 },
          showIf: c => c.drawStyle !== DrawStyle.Points,
        })
        .addRadio({
          path: 'gradientMode',
          name: 'Gradient mode',
          category,
          defaultValue: cfg.gradientMode,
          settings: { options: graphFieldOptions.fillGradient },
          showIf: c => c.drawStyle !== DrawStyle.Points,
        })
        .addRadio({
          path: 'showPoints',
          name: 'Show points',
          category,
          defaultValue: cfg.showPoints,
          settings: { options: graphFieldOptions.showPoints },
          showIf: c => c.drawStyle !== DrawStyle.Points,
        })
        .addSliderInput({
          path: 'pointSize',
          name: 'Point size',
          category,
          defaultValue: cfg.pointSize,
          settings: { min: 1, max: 40, step: 1 },
          showIf: c => c.showPoints !== PointVisibility.Never || c.drawStyle === DrawStyle.Points,
        });

      commonOptionsBuilder.addStackingConfig(builder, cfg.stacking, category);
      commonOptionsBuilder.addAxisConfig(builder, cfg);
      commonOptionsBuilder.addHideFrom(builder);
    },
  };
}
